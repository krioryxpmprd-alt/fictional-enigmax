"use client";
// Inspired by react-hot-toast library
import * as React from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST"
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString();
}

const toastTimeouts = new Map()

const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
}

const listeners = []

let memoryState = { toasts: [] }

function dispatch(action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

// Enhanced toast function with better accessibility
function toast({
  ...props
}) {
  const id = genId()

  const update = (props) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

// Pre-configured toast variants for better UX
toast.success = (message, options = {}) => {
  return toast({
    ...options,
    title: message,
    variant: "success",
    duration: options.duration || 3000,
  })
}

toast.error = (message, options = {}) => {
  return toast({
    ...options,
    title: message,
    variant: "destructive", 
    duration: options.duration || 5000,
  })
}

toast.warning = (message, options = {}) => {
  return toast({
    ...options,
    title: message,
    variant: "warning",
    duration: options.duration || 4000,
  })
}

toast.info = (message, options = {}) => {
  return toast({
    ...options,
    title: message,
    variant: "default",
    duration: options.duration || 3000,
  })
}

toast.loading = (message, options = {}) => {
  return toast({
    ...options,
    title: message,
    variant: "default",
    duration: Infinity, // Loading toasts don't auto-dismiss
  })
}

function useToast() {
  const [state, setState] = React.useState(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    };
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast }

// Toast component for rendering (to be used with your UI library)
export const ToastProvider = ({ children }) => {
  const { toasts } = useToast()

  return (
    <>
      {children}
      <ToastPortal toasts={toasts} />
    </>
  )
}

// Example toast portal component (you'll need to style this)
const ToastPortal = ({ toasts }) => {
  if (typeof window === 'undefined') return null

  return (
    <div 
      className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
      role="region"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <div className="text-sm font-semibold">{title}</div>}
            {description && (
              <div className="text-sm opacity-90">{description}</div>
            )}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
    </div>
  )
}

// Basic Toast components (you should replace these with your actual UI components)
const Toast = ({ children, variant = "default", ...props }) => {
  const variantStyles = {
    default: "bg-white border border-gray-200",
    destructive: "bg-red-50 border border-red-200 text-red-900",
    success: "bg-green-50 border border-green-200 text-green-900",
    warning: "bg-yellow-50 border border-yellow-200 text-yellow-900",
  }

  return (
    <div 
      className={`${variantStyles[variant]} pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md p-6 shadow-lg transition-all`}
      {...props}
    >
      {children}
    </div>
  )
}

const ToastClose = ({ onClose, ...props }) => {
  return (
    <button
      onClick={onClose}
      className="absolute right-2 top-2 rounded-md p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
      aria-label="Close notification"
      {...props}
    >
      ×
    </button>
  )
}