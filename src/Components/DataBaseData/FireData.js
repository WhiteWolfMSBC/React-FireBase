import React, { Component } from 'react';
import StartFirebase from "../FireBaseConfig/FireBase";
import { ref, onValue } from 'firebase/database';
import { Table } from 'react-bootstrap';

const db=StartFirebase();

class FireData extends Component {

    constructor() {
      super();
      this.state = {
         tableData:[]
      }
    }

    componentDidMount(){
        const dbRef = ref (db,'Customer');

        onValue(dbRef, (snapshot)=>{
            let records=[];
            snapshot.forEach(childSnapshot =>{
                let keyName =childSnapshot.key;
                let data =childSnapshot.val();
                records.push({"key":keyName, "data":data});
            });
            this.setState({tableData:records});
        });
    }
    

    render() {
        return (
            <div className='Product-card container-xl containe-lg container-md container-sm container-xs mt-4 mb-4'>

                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Fullname</th>
                            <th>Contact No</th>
                            <th>DoB</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.tableData.map((row,index)=>{
                            return(
                                <tr>
                                    <td>{index}</td>
                                    <td>{row.key}</td>
                                    <td>{row.data.Fullname}</td>
                                    <td>{row.data.Phonenumber}</td>
                                    <td>{row.data.dateofbirth}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>

            </div>
        );
    }
}

export default FireData;


