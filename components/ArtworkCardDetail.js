import useSWR from 'swr'
import Error from 'next/error'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { addToFavourites, removeFromFavourites } from "../lib/userData";

export default function ArtworkCardDetail(props) {

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);
    const { data, error } = useSWR(props.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}` : null);
    
    useEffect(()=>{
        setShowAdded(favouritesList?.includes(props.objectID))
    }, [favouritesList])

    async function favouritesClicked() {
        if(showAdded){
            setFavouritesList(await removeFromFavourites(props.objectID))
            setShowAdded(false)
        }
        else{
            setFavouritesList(await addToFavourites(props.objectID))
            setShowAdded(true)
        }
    }

    if(data == null){
        return null
    }
    else if(error){
        return <Error statusCode={404} />
    }
    else{
        return (
            <>
                <Card style={{ width: '18rem' }}>
                    {data?.primaryImage && <Card.Img variant="top" src={data?.primaryImage} />}
                    <Card.Body>
                        <Card.Title>{data?.title ? data?.title : 'N/A'}</Card.Title>
                        <Card.Text>
                            <strong>Date </strong> {data?.objectDate ? data?.objectDate : 'N/A'}<br />
                            <strong>Classification </strong> {data?.classification ? data?.classification : 'N/A'}<br />
                            <strong>Medium </strong> {data?.medium ? data?.medium : 'N/A'}<br /><br />

                            <strong>Artist </strong> {data?.artistDisplayName ? data?.artistDisplayName : 'N/A'}<br />
                            <a href={data?.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>
                            <br />
                            <strong>Credit Line </strong> {data?.creditLine  ? data?.creditLine  : 'N/A'}<br />
                            <strong>Dimensions </strong> {data?.dimensions ? data?.dimensions : 'N/A'}<br />
                            <Button variant={showAdded ? "primary" : "outline-primary"}
                                onClick={favouritesClicked}>
                                {showAdded ? "+ Favourite (added)" : "+ Favourite"}
                            </Button>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        )
    }
}