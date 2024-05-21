"use client";
import { User as UserIcon } from 'lucide-react';
import UserActions from './UserActions';
import { UserProps } from '@/src/types';

interface Props {
  user: UserProps;
}

const UserRow: React.FC<Props> = ({ user }) => {
  return (
    <tr>
      <td className="border px-4 py-2">
        {user.image ? (
          <img src={user.image} alt="Avatar" className="w-10 h-10 rounded-full" />
        ) : (
          <UserIcon className="w-10 h-10" />
        )}
      </td>
      <td className="border px-4 py-2">{user.fullName}</td>
      <td className="border px-4 py-2">{user.email}</td>
      <td className="border px-4 py-2">{user.phone}</td>
      <td className="border px-4 py-2">{user.dateOfBirth || 'N/A'}</td>
      <td className="border px-4 py-2">{user.role}</td>
      <td className="border px-4 py-2">
        <span
          className={`px-2 py-1 rounded-full text-white ${
            user.accountNonLocked ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {user.accountNonLocked ? 'Enabled' : 'Disabled'}
        </span>
      </td>
      <td className="border px-4 py-2">
        <UserActions userId={user.id} />
      </td>
    </tr>
  );
};

export default UserRow;