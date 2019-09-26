import React from 'react';

export default class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [{
                studentName: 'Iron Man',
                rollNo: '3000',
                maths: '90',
                physics: '95',
                chemistry: '89',
                english: '92'
            },
                {
                    studentName: 'The Hulk',
                    rollNo: '3001',
                    maths: '57',
                    physics: '76',
                    chemistry: '65',
                    english: '65'
                },
                {
                    studentName: 'Captain America',
                    rollNo: '3002',
                    maths: '80',
                    physics: '87',
                    chemistry: '76',
                    english: '79'
                },
                {
                    studentName: 'Thor',
                    rollNo: '3003',
                    maths: '84',
                    physics: '87',
                    chemistry: '83',
                    english: '89'
                }],
            show: false,
            showMarks: false,
            selectedRollNo: ''
        };
        this.showDetails = this.showDetails.bind(this);
        this.showMarks = this.showMarks.bind(this);
    }

    componentDidMount() {
        this.callApi()
            .then(res => {
                this.setState({
                    students: res
                });
            })
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/getScore');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    showDetails() {
        this.setState({show: true});
    }

    showMarks(rollNo) {
        console.log(rollNo);
        this.setState({
            show: false,
            showMarks: true,
            selectedRollNo: rollNo
        });
    }

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
                            <th>Action</th>
                        </tr>
                        </thead>
                        {this.state.students.map((student, index) => (
                            <tbody key={index}>
                            <tr>
                                <td>{student.rollNo}</td>
                                <td>{student.studentName}</td>
                                <td><button onClick={() => this.showMarks(student.rollNo)} type='button'>Show Marks</button></td>
                            </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            );
        }

        if (this.state.showMarks) {
            const selectedStudent = this.state.students.filter((student) => student.rollNo === this.state.selectedRollNo)[0];
            console.log(selectedStudent);

            return (
                <div>
                    <h2>{`Marks of ${selectedStudent.studentName}`}</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{'maths'}</td>
                            <td>{selectedStudent.maths}</td>
                        </tr>
                        <tr>
                            <td>{'physics'}</td>
                            <td>{selectedStudent.physics}</td>
                        </tr>

                        <tr>
                            <td>{'chemistry'}</td>
                            <td>{selectedStudent.chemistry}</td>
                        </tr>
                        <tr>
                            <td>{'english'}</td>
                            <td>{selectedStudent.english}</td>
                        </tr>
                        </tbody>
                    </table>
                    <button onClick={this.showDetails} type='button'>Back</button>
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


