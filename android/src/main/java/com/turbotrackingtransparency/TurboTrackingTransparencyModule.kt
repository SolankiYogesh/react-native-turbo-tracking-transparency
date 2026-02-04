package com.turbotrackingtransparency

import com.facebook.react.bridge.ReactApplicationContext

class TurboTrackingTransparencyModule(reactContext: ReactApplicationContext) :
  NativeTurboTrackingTransparencySpec(reactContext) {

  override fun getTrackingStatus(): String {
    return "authorized"
  }

  override fun requestTrackingPermission(promise: com.facebook.react.bridge.Promise) {
    promise.resolve("authorized")
  }

  companion object {
    const val NAME = NativeTurboTrackingTransparencySpec.NAME
  }
}
