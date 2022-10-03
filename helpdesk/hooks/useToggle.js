// Source: code taken from https://dev.to/alexkhismatulin/update-boolean-state-right-with-react-hooks-3k2i
import { useState, useCallback } from 'react'

// Uses a callback function to set isToggled to true and false
export default function useToggle(initialState) {
  const [isToggled, setIsToggled] = useState(initialState)
  const toggle = useCallback(
    () => setIsToggled((state) => !state),
    [setIsToggled]
  )

  return [isToggled, toggle]
}
