import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
function Faq() {
  return (
    <>
    <Container maxWidth={'md'} sx={{marginBlock:'25px',paddingTop:'25px'}}>
      <Typography sx={{marginBottom:'15px'}} variant='h4' component={'h2'}>
        Frequently Asked Questions
      </Typography>
      <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>What Is Home Interior Design?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, magnam nam maxime excepturi omnis quia enim non, cumque soluta error facilis id quaerat, eaque impedit. Assumenda cum maxime tempore temporibus.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Why Is an Interior Designer Important?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, magnam nam maxime excepturi omnis quia enim non, cumque soluta error facilis id quaerat, eaque impedit. Assumenda cum maxime tempore temporibus.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>What Are the Most Important Factors to Keep In Mind While Designing a Room?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, magnam nam maxime excepturi omnis quia enim non, cumque soluta error facilis id quaerat, eaque impedit. Assumenda cum maxime tempore temporibus.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>

</Container>
    </>
  )
}

export default React.memo(Faq)