import {Container} from 'react-bootstrap';
import {Nav} from "react-bootstrap";
import {Navbar} from "react-bootstrap";
import {NavDropdown} from "react-bootstrap";
import Link from "next/link";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useRouter} from 'next/router';
import {useState} from 'react';
import { addToHistory } from "../lib/userData";

export default function MainNav() {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);
    const [route, setRoute] = useState();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const handleSubmit = async (e) => {
        e.preventDefault()
        router.push(`/artwork?title=true&q=${route}`)
        setSearchHistory(await addToHistory(`title=true&q=${searchField}`)) 
    }
    const expandToggle = () => {
      setIsExpanded(!isExpanded);
    }
    let token = readToken():
    function logout() {
      setIsExpanded(false);
      removeToken();
      router.push("/login");
    }

    return(
<>
      <Navbar className="fixed-top navbar-dark" bg="dark" expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Kin Lok Chan</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={expandToggle} />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/search">Advanced Search</Nav.Link>
          </Nav>
          &nbsp;
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => {setRoute(e.target.value)}}
            />
            <Button type="submit" variant="outline-success">Search</Button>
          </Form>
          &nbsp;
          <Nav>
          <NavDropdown title="User Name" id="collasible-nav-dropdown">
            <Nav.Link href="/favourites">
              <NavDropdown.Item href="/favourites" onClick={expandToggle}>Favourites</NavDropdown.Item>
            </Nav.Link>
            <Nav.Link href="/history">
              <NavDropdown.Item href="/history" onClick={expandToggle}>Search History</NavDropdown.Item>
            </Nav.Link>
            </NavDropdown>

          </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
    );
}