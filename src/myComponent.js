import React from 'react';

export default class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [{
                name: 'Iron Man',
                rollNo: '3000',
                Maths: '90',
                Science: '95',
                English: '89',
                Computer: '92'
            },
                {
                    name: 'The Hulk',
                    rollNo: '3001',
                    Maths: '57',
                    Science: '76',
                    English: '65',
                    Computer: '65'
                },
                {
                    name: 'Captain America',
                    rollNo: '3002',
                    Maths: '80',
                    Science: '87',
                    English: '76',
                    Computer: '79'
                },
                {
                    name: 'Thor',
                    rollNo: '3003',
                    Maths: '84',
                    Science: '87',
                    English: '83',
                    Computer: '89'
                }],
            show: false,
            showMarks: false,
            selectedRollNo: ''
        };
        this.showDetails = this.showDetails.bind(this);
        this.showMarks = this.showMarks.bind(this);
    }

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
                        </tr>
                        </thead>
                        {this.state.students.map((student, index) => (
                            <tbody key={index}>
                            <tr>
                                <td>{student.rollNo}</td>
                                <td>{student.name}
                                    <button onClick={() => this.showMarks(student.rollNo)} type='button'>Show Marks
                                    </button>
                                </td>
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
                    <h2>{`Marks of ${selectedStudent.name}`}</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{'Maths'}</td>
                            <td>{selectedStudent.Maths}</td>
                        </tr>
                        <tr>
                            <td>{'Science'}</td>
                            <td>{selectedStudent.Science}</td>
                        </tr>

                        <tr>
                            <td>{'English'}</td>
                            <td>{selectedStudent.English}</td>
                        </tr>
                        <tr>
                            <td>{'Computer'}</td>
                            <td>{selectedStudent.Computer}</td>
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


