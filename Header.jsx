// Import the Link component from next/link
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/features/auth/authSlice';

function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout()).then(() => {
      router.push('/login');
    });
  };

  return (
    <header className='flex items-center justify-between p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-black'>
      <div>
        <Link href='/instagram'>
          <p className='flex items-center space-x-2'>
            <Image src='/logo insta.png' width={28} height={30} alt='insta pic' />
            <p className='text-1xl font-semibold'>Instagram</p>
          </p>
        </Link>
      </div>
      <ul className='flex items-center space-x-2'>
        {user ? (
          <li>
            <button
              className='bg-white text-blue-500 hover:bg-blue-500 hover:text-black font-semibold py-1 px-2 rounded'
              onClick={onLogout}
            >
              <Image src='/logout.png' width={30} height={30} alt='logout pic' /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link href='/login'>
                <p className='bg-white text-black-500 hover:bg-blue-500 hover:text-black font-semibold py-2 px-4 rounded'><img src='./login2.png' width={20} height={20} alt='login pic'></img>Login</p>
              </Link>
            </li>
            <li>
              <Link href='/register'>
                <p className='bg-white text-black-400 hover:bg-blue-400 hover:text-black font-semibold py-2 px-4 rounded'><img src='./register1.png' width={18} height={20} alt='register pic'></img>Register</p>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
