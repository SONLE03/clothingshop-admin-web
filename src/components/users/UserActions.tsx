import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

interface Props {
  userId: string;
}

const UserActions: React.FC<Props> = ({ userId }) => {
  const handleEdit = () => {
    // Thực hiện chức năng chỉnh sửa người dùng
    console.log(`Edit user: ${userId}`);
  };

  const handleDelete = () => {
    // Thực hiện chức năng xóa người dùng
    console.log(`Delete user: ${userId}`);
  };

  return (
    <div className="flex space-x-2">
      <button onClick={handleEdit} className="text-blue-600 hover:text-blue-800">
        <Edit className="w-5 h-5" />
      </button>
      <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default UserActions;