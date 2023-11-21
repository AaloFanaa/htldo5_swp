import styles from './login.module.css';
import LoginLayout from '../layoutLogin';
import { useSession, signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Login() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <LoginLayout>
        <div>
          <div>Login with Google</div>
        </div>
      </LoginLayout>
    );
  }
  redirect('/');
}
