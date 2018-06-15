function getCache(key) {
  try {
    var value = wx.getStorageSync(key)
    if (value) {
      return value;
    }
  } catch (e) {
    // Do something when catch error
  }
}
function setCache(key, data) {
  try {
    wx.setStorageSync(key, data);
  } catch (e) {
    // Do something when catch error
  }
}
function deleteCache(key) {
  try {
    wx.removeStorageSync(key)
  } catch (e) {
    // Do something when catch error
  }
}

module.exports = {
  getCache,
  setCache,
  deleteCache,
}