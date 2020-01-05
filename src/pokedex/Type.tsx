import React from 'react'
import { useResource } from 'rest-hooks'
import TypeResource from './resources/Type'
import { Badge } from '../ui'

type TypeProps = {
  name: string
}

const Type: React.FC<TypeProps> = ({ name }) => {
  const type = useResource(TypeResource.detailShape(), { name })

  return <Badge className={`${type.getColors()} cursor-pointer`}>{type.getName()}</Badge>
}

export default Type