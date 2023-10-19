import { useNavigate as _useNavigate, Navigator as _Navigator } from '@solidjs/router'

interface Navigator extends _Navigator {}

export const useNavigate = (): Navigator => {
  return _useNavigate()
}
