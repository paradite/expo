package expo.modules.kotlin.functions

import com.facebook.react.bridge.ReadableArray
import expo.modules.kotlin.Promise
import expo.modules.kotlin.exception.CodedException
import expo.modules.kotlin.types.AnyType

class AsyncFunctionComponent(
  name: String,
  desiredArgsTypes: Array<AnyType>,
  private val body: (args: Array<out Any?>) -> Any?
) : AsyncFunction(name, desiredArgsTypes) {
  @Throws(CodedException::class)
  override fun call(args: ReadableArray, promise: Promise) {
    val convertedArgs = convertArgs(args)
    promise.resolve(body(convertedArgs))
  }
}
