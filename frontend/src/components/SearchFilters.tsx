import { useCardStore } from '@/store/cardStore';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchFilters() {
  const { queryParams, setQueryParams } = useCardStore();

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="카드 검색..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={queryParams.search || ''}
          onChange={(e) => setQueryParams({ search: e.target.value, page: 1 })}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={queryParams.sortBy}
          onChange={(e) => setQueryParams({ sortBy: e.target.value, page: 1 })}
        >
          <option value="name">이름순</option>
          <option value="rarity">레어리티순</option>
          <option value="type">타입순</option>
        </select>

        <select
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={queryParams.rarity || ''}
          onChange={(e) => setQueryParams({ rarity: e.target.value, page: 1 })}
        >
          <option value="">모든 레어리티</option>
          <option value="LR">LR</option>
          <option value="UR">UR</option>
          <option value="SSR">SSR</option>
          <option value="SR">SR</option>
          <option value="R">R</option>
          <option value="N">N</option>
        </select>

        <select
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={queryParams.type || ''}
          onChange={(e) => setQueryParams({ type: e.target.value, page: 1 })}
        >
          <option value="">모든 타입</option>
          <option value="AGL">AGL</option>
          <option value="TEQ">TEQ</option>
          <option value="INT">INT</option>
          <option value="STR">STR</option>
          <option value="PHY">PHY</option>
        </select>
      </div>
    </div>
  );
} 