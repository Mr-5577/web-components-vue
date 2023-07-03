// websocket实例
let wsObj = null;
// ws连接地址
let wsUrl = null;
// 是否执行重连 true/不执行 ； false/执行
let lockReconnect = false;
// 重连定时器
let wsCreateHandler = null;
// 连接成功，执行回调函数
let messageCallback = null;
// 连接失败，执行回调函数
let errorCallback = null;
// 发送给后台的数据
let sendDatas = {};
/**
 * 发起websocket请求函数
 * @param {string} url ws连接地址
 * @param {Object} agentData 传给后台的参数
 * @param {function} successCallback 接收到ws数据，对数据进行处理的回调函数
 * @param {function} errCallback ws连接错误的回调函数
 */
export const connectWebsocket = (
  url,
  agentData,
  successCallback,
  errCallback
) => {
  wsUrl = url;
  createWebSoket();
  messageCallback = successCallback;
  errorCallback = errCallback;
  sendDatas = agentData;
};
// 手动关闭websocket （这里手动关闭会执行onclose事件）
export const closeWebsocket = () => {
  if (wsObj) {
    wsObj.close(); // 关闭websocket
    // wsObj.onclose() // 关闭websocket(如果上面的关闭不生效就加上这一条)
    // 关闭重连
    lockReconnect = true;
    wsCreateHandler && clearTimeout(wsCreateHandler);
    // 关闭心跳检查
    heartCheck.stop();
  }
};
// 创建ws函数
const createWebSoket = () => {
  if (typeof WebSocket === "undefined") {
    console.log("您的浏览器不支持WebSocket，无法获取数据");
    return false;
  }
  try {
    wsObj = new WebSocket(wsUrl);
    initWebsocket();
  } catch (e) {
    reconnect(); // 连接异常，开始重连
  }
};
const initWebsocket = () => {
  try {
    // 连接成功
    wsObj.onopen = event => {
      onWsOpen(event);
      heartCheck.reset();
    };

    // 监听服务器端返回的信息
    wsObj.onmessage = event => {
      onWsMessage(event);
      heartCheck.reset();
    };
    // 连接关闭
    wsObj.onclose = event => {
      onWsClose(event); //onclose执行关闭事件
    };
    // 连接错误
    wsObj.onerror = event => {
      onWsError(event); //onerror执行error事件，开始重连
      reconnect();
    };
  } catch (err) {
    // 绑定事件没有成功，启动重连
    reconnect();
  }
};
// 建立连接
const onWsOpen = event => {
  console.log("CONNECT", "连接成功");
  // // 客户端与服务器端通信
  // wsObj.send('我发送消息给服务端');
  // 添加状态判断，当为OPEN时，发送消息
  if (wsObj.readyState === wsObj.OPEN) {
    // wsObj.OPEN = 1
    // 发给后端的数据需要字符串化
    wsObj.send(JSON.stringify(sendDatas));
  }
  // wsObj.readyState=3, ws连接异常，开始重连
  if (wsObj.readyState === wsObj.CLOSED) {
    reconnect();
    errorCallback();
  }
};
// 接收到服务端的信息
const onWsMessage = event => {
  const jsonStr = event.data;
  console.log("onWsMessage接收到服务器的数据: ", jsonStr);
  messageCallback(jsonStr);
};
// 连接关闭
const onWsClose = event => {
  console.log("onclose event: ", event);
  // e.code === 1000  表示正常关闭。 无论为何目的而创建, 该链接都已成功完成任务。
  // e.code !== 1000  表示非正常关闭。
  if (event && event.code !== 1000) {
    errorCallback();
    // 如果不是手动关闭，这里的重连会执行；如果调用了手动关闭函数，这里重连不会执行
    reconnect();
  }
};
const onWsError = event => {
  console.log("onWsError: ", event.data);
  errorCallback();
};

// 重连函数，3秒重连一次
const reconnect = () => {
  if (lockReconnect) {
    return;
  }
  // 每一次重连都清除上一次连接
  if (wsObj) {
    wsObj.close(); // 关闭websocket
    // wsObj.onclose() // 关闭websocket(如果上面的关闭不生效就加上这一条)
  }
  lockReconnect = true;
  // 没连接上会一直重连，设置延迟避免请求过多
  wsCreateHandler && clearTimeout(wsCreateHandler);
  wsCreateHandler = setTimeout(() => {
    createWebSoket();
    lockReconnect = false;
  }, 3000);
};

// 心跳检查（看看websocket是否还在正常连接中）
let heartCheck = {
  timeout: 30000,
  timeoutObj: null,
  serverTimeoutObj: null,
  // 重启
  reset() {
    this.timeoutObj && clearTimeout(this.timeoutObj);
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
    this.start();
  },
  // 停止
  stop() {
    this.timeoutObj && clearTimeout(this.timeoutObj);
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
  },
  // 开启定时器
  start() {
    this.stop();
    // 30s之内如果没有收到后台的消息，则认为是连接断开了，需要重连
    this.timeoutObj = setTimeout(() => {
      try {
        const datas = { ping: true };
        wsObj.send(JSON.stringify(datas));
      } catch (err) {
        console.log("发送ping异常");
      }
      // 内嵌定时器
      this.serverTimeoutObj = setTimeout(() => {
        reconnect();
      }, this.timeout);
    }, this.timeout);
  }
};
