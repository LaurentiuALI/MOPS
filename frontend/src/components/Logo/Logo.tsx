import { useNavigate } from 'react-router-dom';
import FindCoffeeLogo from '../../assets/icons/Find_Coffee_Logo.svg';
export default function Logo() {
  const navigate = useNavigate();
  return (
    <img
      className="logo"
      src={FindCoffeeLogo}
      alt="Find Coffee Logo"
      title="We find you the best coffee in town"
      onClick={() => {
        navigate('/');
      }}
    />
  );
}
