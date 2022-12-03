import styles from '../styles/History.module.css';
import {useAtom} from 'jotai';
import {searchHistoryAtom} from "../store";
import {Row, Col, Card, ListGroup, Button} from 'react-bootstrap';
import { useRouter } from "next/router";
import { removeHistory } from '../lib/userData';

export default function History (){
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();

    let parsedHistory = [];

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    function historyClicked (e, index){
        router.push(`/artwork?${searchHistory}[${index}]`);
    }

    async function removeHistoryClicked (e, index){
        e.stopPropagation(); // stop the event from trigging other events
        setSearchHistory(await removeFromHistory(searchHistory[index])); 

    }
    if(!favouritesList) return null;
    return (
        <>
            {parsedHistory.length > 0
                ? parsedHistory.map((historyItem, index) => {
                    return (
                        <ListGroup key={index}>
                            <ListGroup.Item className={styles.historyListItem}
                                onClick={historyClicked(index)} >
                                {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                                <Button className="float-end" variant="danger" size="sm" 
                                onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    )
                })
                : <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Text>
                    Nothing Here Try searching for some artwork
                  </Card.Text>
                </Card.Body>
              </Card>}
        </>
    );

}