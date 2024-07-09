"use strict";
const video = {
  namespaced: true,
  state: {
    videoData: {}
  },
  mutations: {
    setVideoData(state, videoData) {
      state.videoData = videoData;
    }
  },
  actions: {}
};
exports.video = video;
