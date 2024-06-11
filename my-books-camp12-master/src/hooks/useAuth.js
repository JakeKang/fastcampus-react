import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function useAuth(hasToken) {
  const token = useSelector((state) => state.auth.token);
  const history = useHistory();

  if (hasToken) {
    if (token === null) {
      history.push('/signin');
    }
  } else {
    if (token !== null) {
      history.push('/');
    }
  }
}
