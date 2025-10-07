import type { Room } from "../mockData";

interface RoomItemProps {
  room: Room;
  onEdit?: (room: Room) => void;
  onDelete?: (roomId: string) => void;
}

const RoomItem = ({ room, onEdit, onDelete }: RoomItemProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-medium text-gray-800 mb-2">{room.name}</h3>
      <p className="text-gray-600 leading-relaxed mb-4">{room.description}</p>
      <p className="text-sm text-gray-500 mb-5">Створено: {new Date(room.createdAt).toLocaleDateString("uk-UA")}</p>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit?.(room)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer"
        >
          Редагувати
        </button>
        <button
          onClick={() => onDelete?.(room.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer"
        >
          Видалити
        </button>
      </div>
    </div>
  );
};

export default RoomItem;
