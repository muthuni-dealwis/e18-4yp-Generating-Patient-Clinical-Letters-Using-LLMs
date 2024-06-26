// HomeIcon.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const HomeIcon: React.FC = () => {
  return (
    <Link href="/">
        <FontAwesomeIcon icon={faHome} style={{ fontSize: '20px' }} className="text-white" />
    </Link>
  );
};

export default HomeIcon;