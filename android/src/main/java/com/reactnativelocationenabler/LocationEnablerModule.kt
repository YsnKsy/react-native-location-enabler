package com.reactnativelocationenabler

import android.app.Activity
import android.content.Intent
import android.content.IntentSender
import androidx.annotation.Nullable
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.google.android.gms.common.api.ResolvableApiException
import com.google.android.gms.location.LocationRequest
import com.google.android.gms.location.LocationRequest.*
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.LocationSettingsRequest
import com.google.android.gms.location.LocationSettingsResponse
import com.google.android.gms.tasks.Task
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import java.util.*

class LocationEnablerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  init {
    val activityEventListener = object : BaseActivityEventListener() {
      override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, @Nullable intent: Intent?) {
        if (intent !== null && requestCode != REQUEST_TURN_DEVICE_LOCATION_ON) return
        val result = Arguments.createMap()
        when (resultCode) {
          -1 -> result.putBoolean("locationEnabled", true)
          else -> result.putBoolean("locationEnabled", false)
        }
        sendEvent(EVENT_NAME, result)
      }
    }
    reactContext.addActivityEventListener(activityEventListener)
  }

  private val TAG = "LocationEnabler"
  private val REQUEST_TURN_DEVICE_LOCATION_ON = 29
  private val EVENT_NAME = "onChangeLocationSettings"
  private val context: ReactApplicationContext = reactContext
  private var priority: Int = PRIORITY_BALANCED_POWER_ACCURACY
  private var alwaysShow: Boolean = false
  private var needBle: Boolean = false

  override fun getName(): String = TAG

  override fun getConstants(): Map<String, Int>? {
    val constants: MutableMap<String, Int> = HashMap()
    constants["HIGH_ACCURACY"] = PRIORITY_HIGH_ACCURACY
    constants["BALANCED_POWER_ACCURACY"] = PRIORITY_BALANCED_POWER_ACCURACY
    constants["LOW_POWER"] = PRIORITY_LOW_POWER
    constants["NO_POWER"] = PRIORITY_NO_POWER
    return constants
  }

  @ReactMethod
  fun checkSettings(config: ReadableMap) {
    extractArgs(config)
    checkDeviceLocationSettings(priority, alwaysShow, needBle)
  }

  @ReactMethod
  fun requestResolutionSettings(config: ReadableMap) {
    extractArgs(config)
    requestDeviceResolutionLocationSettings(priority, alwaysShow, needBle)
  }

  private fun extractArgs(config: ReadableMap) = runBlocking(Dispatchers.Default) {
    if (config.hasKey("priority")) priority = config.getInt("priority")
    if (config.hasKey("alwaysShow")) alwaysShow = config.getBoolean("alwaysShow")
    if (config.hasKey("needBle")) needBle = config.getBoolean("needBle")
  }

  private fun locationSettingsRequestBuilder(priority: Int, alwaysShow: Boolean, needBle: Boolean): Task<LocationSettingsResponse> {
    val locationRequest = LocationRequest.create().setPriority(priority)
    val build = LocationSettingsRequest.Builder()
      .setAlwaysShow(alwaysShow)
      .setNeedBle(needBle)
      .addLocationRequest(locationRequest).build()
    return LocationServices.getSettingsClient(currentActivity!!).checkLocationSettings(build)
  }

  private fun checkDeviceLocationSettings(priority: Int, alwaysShow: Boolean, needBle: Boolean) = runBlocking(Dispatchers.Default) {
    if (currentActivity != null) {
      val locationSettingsResponseTask = locationSettingsRequestBuilder(priority, alwaysShow, needBle)
      val res = Arguments.createMap()
      locationSettingsResponseTask.addOnFailureListener {
        res.putBoolean("locationEnabled", false)
        sendEvent(EVENT_NAME, res)
      }
      locationSettingsResponseTask.addOnSuccessListener {
        res.putBoolean("locationEnabled", true)
        sendEvent(EVENT_NAME, res)
      }
    }
  }

  private fun requestDeviceResolutionLocationSettings(priority: Int, alwaysShow: Boolean, needBle: Boolean) = runBlocking(Dispatchers.Default) {
    if (currentActivity != null) {
      val locationSettingsResponseTask = locationSettingsRequestBuilder(priority, alwaysShow, needBle)
      locationSettingsResponseTask.addOnFailureListener { exception ->
        if (exception is ResolvableApiException) try {
          exception.startResolutionForResult(currentActivity!!, REQUEST_TURN_DEVICE_LOCATION_ON)
        } catch (sendEx: IntentSender.SendIntentException) {
          println("requestDeviceResolutionLocationSettings.addOnFailureListener > catch error > " + sendEx.localizedMessage)
        }
      }
    }
  }

  private fun sendEvent(eventName: String, @Nullable params: WritableMap) = runBlocking(Dispatchers.Default) {
    context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit(eventName, params)
  }
}
