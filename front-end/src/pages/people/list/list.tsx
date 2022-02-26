import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import './list.css';

function PeopleList() {
  const history = useHistory();
  const [people, setPeople] = useState<any[]>([]);

  useEffect(() =>{
    fetch(`http://${process.env.REACT_APP_BACK_END}:9000/people`)
      .then((response) => response.json())
      .then((people) => setPeople(people));
  }, []);

  const handleSelect = (id: string) => history.push(`/people/${id}`);

  return (
    <div className="people-list">
      <ul>
          {
            people.map(p => {
              return (
                <li key={p.id} onClick={() => handleSelect(p.id)}>{p.firstname} {p.lastname}</li>
                )
              })
            }
      </ul>

      <button type="button" onClick={() => handleSelect('new')}>ADD NEW</button>
     </div>
  );
}

export default PeopleList;
