import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
import React, { useState, useEffect } from 'react';
import ReactTable from "react-table-6";
import 'react-table-6/react-table.css';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import AppBar from '@mui/material/AppBar';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getThemeProps } from '@mui/system';



const Chart = () => {

    const [trainings, setTrainings] = useState([]);
    const [activities,setActivities] = useState([]);
    const [activitiesSTR,setActivitiesSTR] = useState('');
    const [buckets,setBuckets] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        collectActivities(trainings);

    }, [trainings]);

    useEffect(() => {
        collectBuckets(trainings, activities);

    }, [activities]);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(

                data => {
                    const results = data.content.map(row => (
                        {
                            activity: row.activity,
                            duration: row.duration,
                        }))
                    setTrainings(results);
                })
    }

    function collectActivities(trainings){ 
        let activities = [];
        let str = '';
        let toBeAdded;
        for (let i = 0; i < trainings.length; i++){
            toBeAdded = true;
            for(let j= 0; j< activities.length; j++){
                if (trainings[i].activity === activities[j]){
                    toBeAdded = false;
                };
            }
            if(toBeAdded){
                activities.push(trainings[i].activity);
                str +=", " + trainings[i].activity;
            }
        }
        setActivities(activities);
    }

    function collectBuckets(trainings, activities){
        console.log('inside collectBuckets');
        let buckets = [];
        for (let i = 0; i < activities.length; i++){
            let laskuri = 0;
            buckets.push({activity:activities[i], amount: 0})
            for (let j = 0; j < trainings.length; j++){
                console.log(activities[i]);
                console.log('Compared to ');
                console.log(trainings[j]);
                if (activities[i] === trainings[j].activity){
                    console.log('Add one: ');
                    console.log(activities[i]);
                    buckets[i].amount =buckets[i].amount +trainings[j].duration;
                }
            }
        }
        setBuckets(buckets);
        console.log(buckets);
    }

    // Sample data
    const data = [
        { name: 'Geeksforgeeks', students: 400 },
        { name: 'Technical scripter', students: 700 },
        { name: 'Geek-i-knack', students: 200 },
        { name: 'Geek-o-mania', students: 1000 }
    ];

    //Used the resource https://www.geeksforgeeks.org/create-a-bar-chart-using-recharts-in-reactjs/
    return (
        <div>{activitiesSTR}
        <BarChart width={1200} height={600} data={buckets}>
            <Bar dataKey="amount" fill="green" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="activity" />
            <YAxis />
        </BarChart>
        </div>
    );
}

export default Chart;
