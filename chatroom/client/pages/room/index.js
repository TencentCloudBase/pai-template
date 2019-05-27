import regeneratorRuntime from '../../libs/runtime'
import TcbJwt from '../../libs/jwt-mp-sdk/index'
import IO from '../../libs/weapp.socket.io'
import config from '../../config/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomsList: [],
    roomIndex: 0,
    userInfo: {},
    room: '',
    inputValue: '',
    message: []
  },

  updateUser(userInfo) {
    setTimeout(() => {
      this.setData({
        userInfo
      })
    }, 300)
  },

  joinRoom(room) {
    this.setData({
      room
    }, async () => {
      this.socket.emit('join-room', this.room)
    })
  },

  onMessage() {
    this.socket.on('message', (data) => {
      this.data.message.push(data)
      this.setData({
        message: this.data.message
      })
    })
  },

  connectSocket() {
    const token = TcbJwt.auth.getToken()
    this.socket = new IO(config.url, {
      transports: ['websocket'],
      query: {
        token
      }
    })
    
    this.socket.on('connect', () => {
      this.joinRoom(this.room)
    })

    // token校验报错，重新登陆
    this.socket.on('error', (err) => {
      if (err) {
        console.error('socket error:',err)
        wx.clearStorageSync('tcb-token')
        wx.showToast({
          title: `${err}`,
          icon: 'none',
          complete: () => {
            // 重新登陆
            setTimeout(() => {
              this.setData({
                userInfo: null
              })
            }, 1000)
          }
        })
      }
    })

    this.onMessage()
  },

  async send(e) {
    let message = e.detail.value.message

    this.socket.emit('message', message, (data) => {
      this.setData({
        inputValue: ''
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.room = options.room || 'Lobby'
    this.connectSocket();
    this.updateUser(wx.getStorageSync('userInfo'))

    wx.setNavigationBarTitle({
      title: `房间  ${this.room} `
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.socket.close()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
