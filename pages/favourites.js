import {useAtom} from 'jotai';
import {favouritesAtom} from '../store';
import {Row, Col, Card} from 'react-bootstrap';
import ArtworkCard from '../components/ArtworkCard';

export default function Favourites (){
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  
    if(!favouritesList) return null;
    else{
  return (
    <>
      <Row className="gy-4">
        {favouritesList.length > 0
          ? favouritesList.map(currentOb => {
            return (
              <Col lg={3} key={currentOb}><ArtworkCard objectID={currentOb} /></Col>
            )
          })
          : <Card>
            <Card.Body>
              <Card.Text>
                Nothing Here Try adding some new artwork to the list
              </Card.Text>
            </Card.Body>
          </Card>
        }
      </Row>
    </>
    )
  }
}