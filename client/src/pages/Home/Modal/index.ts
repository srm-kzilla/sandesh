import { Login } from './Login';
import { Register } from './Register';
export { Login, Register };
export interface ModalPropTypes {
  setShowModal: React.Dispatch<React.SetStateAction<'HIDDEN' | 'REGISTER' | 'LOGIN'>>;
  showModal: 'HIDDEN' | 'REGISTER' | 'LOGIN';
}
