package com.turbotrackingtransparency

import com.facebook.react.bridge.ReactApplicationContext

class TurboTrackingTransparencyModule(reactContext: ReactApplicationContext) :
  NativeTurboTrackingTransparencySpec(reactContext) {

  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  companion object {
    const val NAME = NativeTurboTrackingTransparencySpec.NAME
  }
}
