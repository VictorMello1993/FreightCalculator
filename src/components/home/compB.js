import { useSelector } from 'react-redux';

const CompB = () => {
  const students = useSelector(state => state.students.data)
  return (
    <div>
      <h1>Componente B</h1>
      <hr />
      <ul>
      {students.map(student => (
          <li>{student.nome}</li>
        ))}
      </ul>
    </div>
  )
}

export default CompB