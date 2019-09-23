import React from 'react';

export default class Component extends React.Component{
  constructor(props){
    super(props);
    this.state={
      students: [
        {
          name: 'Robert Downey Jr.',
          rollNo: '3000'
        },
        {
          name: 'Aakrti Jain',
          rollNo: '3001'
        },
        {
          name: 'Captain America',
          rollNo: '3002'
        },
        {
          name: 'Thor',
          rollNo: '3003'
        }
      ],
      show: false
    }
    this.showDetails = this.showDetails.bind(this);
  }

  showDetails() {
    this.setState({show:true});
  }

    componentDidMount() {
        this.callApi()
            .then(res => {
                this.setState({
                    students: res.map((student) => {
                        return {
                            name: student.studentName,
                            rollNo: student.rollNo
                        };
                    })
                })
            })
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/getScore');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    render() {
        if (this.state.show) {
            return (
                <div>
                    <h2>Students Details</h2>
                    <h3>{`Total Number of students: ${this.state.students.length}`}</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>Roll number</th>
                            <th>Name</th>
                        </tr>
                        </thead>
                        {this.state.students.map((student, index)=> (
                            <tbody key={index}>
                            <tr>
                                <td>{student.rollNo}</td>
                                <td>{student.name}</td>
                            </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            );
        }

        return (
            <div>
                <button onClick={this.showDetails} type='button'>Show student details</button>
            </div>
        )
    }

}
