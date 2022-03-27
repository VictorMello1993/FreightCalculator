import { useSelector } from 'react-redux';

const CompA = () => {
  const students = useSelector(state => state.students.data)

  return (
    <div>
      <h1>Componente A</h1>
      <hr />
      <ul>
        {students.map(student => (
          <li>{student.nome}</li>
        ))}
      </ul>
    </div>
  )
}

export default CompA