import { useNavigate } from 'react-router-dom'

interface TreeProps {
  node: TreeNodeCategory
}

const QuickLink = ({ node }: TreeProps) => {
  const router = useNavigate()

  const handleNavigation = () => {
    router(`/tao-danh-muc-cap-${node.level}/${node.id}`)
  }

  return (
    <li className='relative after:absolute after:left-[-5px] after:top-2 after:h-full after:border-l after:border-dashed after:border-gray-500 after:content-[""]'>
      <p
        className='my-3 block cursor-pointer leading-7 hover:bg-red-50 hover:text-primaryColor'
        onClick={handleNavigation}
      >
        {node.name}
      </p>
      {node.child?.length! > 0 && (
        <ul className='ml-4'>
          {node.child?.map((child) => (
            <QuickLink
              key={`${child.level} - ${child.id} - ${Math.random() * 100}`}
              node={child}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export default QuickLink
