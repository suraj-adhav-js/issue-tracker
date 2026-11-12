import classNames from 'classnames'
import SkeletonComp from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface Props{
    count?: number,
    width?: string,
    height?: string
    className?:string
}

const Skeleton = ({count,width, height, className}: Props) => {
  return (
    <SkeletonComp count={count} width={width} height={height} className={className}/>
  )
}

export default Skeleton