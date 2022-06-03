/// This file implements definition components that are allowed in any object-based definition — `ObjectDefinition`.
/// So far only constants and functions belong to plain object.

// MARK: - Constants

/**
 Definition function setting the module's constants to export.
 */
public func constants(_ body: @escaping () -> [String: Any?]) -> AnyDefinition {
  return ConstantsDefinition(body: body)
}

/**
 Definition function setting the module's constants to export.
 */
public func constants(_ body: @autoclosure @escaping () -> [String: Any?]) -> AnyDefinition {
  return ConstantsDefinition(body: body)
}

// MARK: - Functions

/**
 Function without arguments.
 */
@available(*, deprecated, renamed: "asyncFunction")
public func function<R>(
  _ name: String,
  _ closure: @escaping () throws -> R
) -> AnyFunction {
  return ConcreteFunction(
    name,
    argTypes: [],
    closure
  )
}

/**
 Function with one argument.
 */
@available(*, deprecated, renamed: "asyncFunction")
public func function<R, A0: AnyArgument>(
  _ name: String,
  _ closure: @escaping (A0) throws -> R
) -> AnyFunction {
  return ConcreteFunction(
    name,
    argTypes: [ArgumentType(A0.self)],
    closure
  )
}

/**
 Function with two arguments.
 */
@available(*, deprecated, renamed: "asyncFunction")
public func function<R, A0: AnyArgument, A1: AnyArgument>(
  _ name: String,
  _ closure: @escaping (A0, A1) throws -> R
) -> AnyFunction {
  return ConcreteFunction(
    name,
    argTypes: [ArgumentType(A0.self), ArgumentType(A1.self)],
    closure
  )
}

/**
 Function with three arguments.
 */
@available(*, deprecated, renamed: "asyncFunction")
public func function<R, A0: AnyArgument, A1: AnyArgument, A2: AnyArgument>(
  _ name: String,
  _ closure: @escaping (A0, A1, A2) throws -> R
) -> AnyFunction {
  return ConcreteFunction(
    name,
    argTypes: [
      ArgumentType(A0.self),
      ArgumentType(A1.self),
      ArgumentType(A2.self)
    ],
    closure
  )
}

/**
 Function with four arguments.
 */
@available(*, deprecated, renamed: "asyncFunction")
public func function<R, A0: AnyArgument, A1: AnyArgument, A2: AnyArgument, A3: AnyArgument>(
  _ name: String,
  _ closure: @escaping (A0, A1, A2, A3) throws -> R
) -> AnyFunction {
  return ConcreteFunction(
    name,
    argTypes: [
      ArgumentType(A0.self),
      ArgumentType(A1.self),
      ArgumentType(A2.self),
      ArgumentType(A3.self)
    ],
    closure
  )
}

/**
 Function with five arguments.
 */
@available(*, deprecated, renamed: "asyncFunction")
public func function<R, A0: AnyArgument, A1: AnyArgument, A2: AnyArgument, A3: AnyArgument, A4: AnyArgument>(
  _ name: String,
  _ closure: @escaping (A0, A1, A2, A3, A4) throws -> R
) -> AnyFunction {
  return ConcreteFunction(
    name,
    argTypes: [
      ArgumentType(A0.self),
      ArgumentType(A1.self),
      ArgumentType(A2.self),
      ArgumentType(A3.self),
      ArgumentType(A4.self)
    ],
    closure
  )
}

/**
 Function with six arguments.
 */
@available(*, deprecated, renamed: "asyncFunction")
public func function<R, A0: AnyArgument, A1: AnyArgument, A2: AnyArgument, A3: AnyArgument, A4: AnyArgument, A5: AnyArgument>(
  _ name: String,
  _ closure: @escaping (A0, A1, A2, A3, A4, A5) throws -> R
) -> AnyFunction {
  return ConcreteFunction(
    name,
    argTypes: [
      ArgumentType(A0.self),
      ArgumentType(A1.self),
      ArgumentType(A2.self),
      ArgumentType(A3.self),
      ArgumentType(A4.self),
      ArgumentType(A5.self)
    ],
    closure
  )
}

/**
 Function with seven arguments.
 */
@available(*, deprecated, renamed: "asyncFunction")
public func function<R, A0: AnyArgument, A1: AnyArgument, A2: AnyArgument, A3: AnyArgument, A4: AnyArgument, A5: AnyArgument, A6: AnyArgument>(
  _ name: String,
  _ closure: @escaping (A0, A1, A2, A3, A4, A5, A6) throws -> R
) -> AnyFunction {
  return ConcreteFunction(
    name,
    argTypes: [
      ArgumentType(A0.self),
      ArgumentType(A1.self),
      ArgumentType(A2.self),
      ArgumentType(A3.self),
      ArgumentType(A4.self),
      ArgumentType(A5.self),
      ArgumentType(A6.self)
    ],
    closure
  )
}

/**
 Function with eight arguments.
 */
@available(*, deprecated, renamed: "asyncFunction")
public func function<R, A0: AnyArgument, A1: AnyArgument, A2: AnyArgument, A3: AnyArgument, A4: AnyArgument, A5: AnyArgument, A6: AnyArgument, A7: AnyArgument>(
  _ name: String,
  _ closure: @escaping (A0, A1, A2, A3, A4, A5, A6, A7) throws -> R
) -> AnyFunction {
  return ConcreteFunction(
    name,
    argTypes: [
      ArgumentType(A0.self),
      ArgumentType(A1.self),
      ArgumentType(A2.self),
      ArgumentType(A3.self),
      ArgumentType(A4.self),
      ArgumentType(A5.self),
      ArgumentType(A6.self),
      ArgumentType(A7.self)
    ],
    closure
  )
}

// MARK: - Asynchronous functions

/**
 Asynchronous function without arguments.
 */
public func asyncFunction<R>(
  _ name: String,
  _ closure: @escaping () throws -> R
) -> AnyFunction {
  return AsyncFunction(
    name,
    argTypes: [],
    closure
  )
}

/**
 Asynchronous function with one argument.
 */
public func asyncFunction<R, A0: AnyArgument>(
  _ name: String,
  _ closure: @escaping (A0) throws -> R
) -> AnyFunction {
  return AsyncFunction(
    name,
    argTypes: [ArgumentType(A0.self)],
    closure
  )
}

/**
 Asynchronous function with two arguments.
 */
public func asyncFunction<R, A0: AnyArgument, A1: AnyArgument>(
  _ name: String,
  _ closure: @escaping (A0, A1) throws -> R
) -> AnyFunction {
  return AsyncFunction(
    name,
    argTypes: [ArgumentType(A0.self), ArgumentType(A1.self)],
    closure
  )
}

/**
 Asynchronous function with three arguments.
 */
public func asyncFunction<R, A0: AnyArgument, A1: AnyArgument, A2: AnyArgument>(
  _ name: String,
  _ closure: @escaping (A0, A1, A2) throws -> R
) -> AnyFunction {
  return AsyncFunction(
    name,
    argTypes: [
      ArgumentType(A0.self),
      ArgumentType(A1.self),
      ArgumentType(A2.self)
    ],
    closure
  )
}

/**
 Asynchronous function with four arguments.
 */
public func asyncFunction<R, A0: AnyArgument, A1: AnyArgument, A2: AnyArgument, A3: AnyArgument>(
  _ name: String,
  _ closure: @escaping (A0, A1, A2, A3) throws -> R
) -> AnyFunction {
  return AsyncFunction(
    name,
    argTypes: [
      ArgumentType(A0.self),
      ArgumentType(A1.self),
      ArgumentType(A2.self),
      ArgumentType(A3.self)
    ],
    closure
  )
}

/**
 Asynchronous function with five arguments.
 */
public func asyncFunction<R, A0: AnyArgument, A1: AnyArgument, A2: AnyArgument, A3: AnyArgument, A4: AnyArgument>(
  _ name: String,
  _ closure: @escaping (A0, A1, A2, A3, A4) throws -> R
) -> AnyFunction {
  return AsyncFunction(
    name,
    argTypes: [
      ArgumentType(A0.self),
      ArgumentType(A1.self),
      ArgumentType(A2.self),
      ArgumentType(A3.self),
      ArgumentType(A4.self)
    ],
    closure
  )
}

/**
 Asynchronous function with six arguments.
 */
public func asyncFunction<R, A0: AnyArgument, A1: AnyArgument, A2: AnyArgument, A3: AnyArgument, A4: AnyArgument, A5: AnyArgument>(
  _ name: String,
  _ closure: @escaping (A0, A1, A2, A3, A4, A5) throws -> R
) -> AnyFunction {
  return AsyncFunction(
    name,
    argTypes: [
      ArgumentType(A0.self),
      ArgumentType(A1.self),
      ArgumentType(A2.self),
      ArgumentType(A3.self),
      ArgumentType(A4.self),
      ArgumentType(A5.self)
    ],
    closure
  )
}

/**
 Asynchronous function with seven arguments.
 */
public func asyncFunction<R, A0: AnyArgument, A1: AnyArgument, A2: AnyArgument, A3: AnyArgument, A4: AnyArgument, A5: AnyArgument, A6: AnyArgument>(
  _ name: String,
  _ closure: @escaping (A0, A1, A2, A3, A4, A5, A6) throws -> R
) -> AnyFunction {
  return AsyncFunction(
    name,
    argTypes: [
      ArgumentType(A0.self),
      ArgumentType(A1.self),
      ArgumentType(A2.self),
      ArgumentType(A3.self),
      ArgumentType(A4.self),
      ArgumentType(A5.self),
      ArgumentType(A6.self)
    ],
    closure
  )
}

/**
 Asynchronous function with eight arguments.
 */
public func asyncFunction<R, A0: AnyArgument, A1: AnyArgument, A2: AnyArgument, A3: AnyArgument, A4: AnyArgument, A5: AnyArgument, A6: AnyArgument, A7: AnyArgument>(
  _ name: String,
  _ closure: @escaping (A0, A1, A2, A3, A4, A5, A6, A7) throws -> R
) -> AnyFunction {
  return AsyncFunction(
    name,
    argTypes: [
      ArgumentType(A0.self),
      ArgumentType(A1.self),
      ArgumentType(A2.self),
      ArgumentType(A3.self),
      ArgumentType(A4.self),
      ArgumentType(A5.self),
      ArgumentType(A6.self),
      ArgumentType(A7.self)
    ],
    closure
  )
}

// MARK: - Events

/**
 Defines event names that the object can send to JavaScript.
 */
public func events(_ names: String...) -> AnyDefinition {
  return EventsDefinition(names: names)
}

/**
 Function that is invoked when the first event listener is added.
 */
public func onStartObserving(_ body: @escaping () -> Void) -> AnyFunction {
  return ConcreteFunction("startObserving", argTypes: [], body)
}

/**
 Function that is invoked when all event listeners are removed.
 */
public func onStopObserving(_ body: @escaping () -> Void) -> AnyFunction {
  return ConcreteFunction("stopObserving", argTypes: [], body)
}
