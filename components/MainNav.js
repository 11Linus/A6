import {Container} from 'react-bootstrap';
import {Nav} from "react-bootstrap";
import {Navbar} from "react-bootstrap";
import {NavDropdown} from "react-bootstrap";
import Link from "next/link";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useRouter} from 'next/router';
import {useState} from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from "../store";
import { addToHistory } from "../lib/userData";
import { removeToken, readToken } from "../lib/authenticate";

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
    let token = readToken();
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
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={(e) => {setIsExpanded(!isExpanded)}}/>
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto">
                  <Link href="/" passHref><Nav.Link onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/"}>Home</Nav.Link></Link>
                  {token 
                  && 
                  <Link href="/search" passHref><Nav.Link onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/search"}>Advanced Search</Nav.Link></Link>
                  }
                  
               </Nav>
               &nbsp;
               {token && 
               <Form className="d-flex" onSubmit={handleSubmit}>
                  <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {setRoute(e.target.value)}}
                  />
                  <Button type="submit" variant="success">Search</Button>
               </Form>
               }
            
               &nbsp;
               {token 
                  ?
               <Nav>
                  <NavDropdown title={token.userName} id="basic-nav-dropdown" active={router.pathname === "/favourites" || router.pathname === "/history"} >
                     <Link href="/favourites" passHref>
                        <NavDropdown.Item onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item>
                     </Link>
                     <Link href="/history" passHref>
                        <NavDropdown.Item onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/history"}>Search History</NavDropdown.Item>
                     </Link>
                     <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
               </Nav>
               :
               <Nav className="ms-auto">
                  <Link href="/register" passHref><Nav.Link onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/register"}>Register</Nav.Link></Link>
                  <Link href="/login" passHref><Nav.Link onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/login"}>Login</Nav.Link></Link>
               </Nav>
               }
               
            </Navbar.Collapse>
         </Container>
      </Navbar>
      <br />
      <br />
     </>
    );
}