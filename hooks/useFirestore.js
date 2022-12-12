import React, { useState, useEffect } from 'react'
import {firebase} from '../firebase/config'

const useFirestore = (collections) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {        
        const unsub = firebase.firestore().collection(collections)
            .orderBy('createdAt', 'desc')
            .onSnapshot((snap) => {
                let documents = [];
                snap.forEach(doc => {
                    documents.push({...doc.data(), id: doc.id});
                })
                setDocs(documents);
            })
        return () => unsub();
    }, [collections])

    
    return { docs };
}

export default useFirestore