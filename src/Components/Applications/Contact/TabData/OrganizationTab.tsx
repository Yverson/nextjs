import  {  useCallback, useState } from 'react';
import { Row, Col, Card, CardBody, TabContent } from 'reactstrap';
import { Organization } from '@/Constant';
import NavOrg from './OrganicTab/NavOrg';
import TabOrg from './OrganicTab/TabOrg';
import CommonCardHeader from '@/CommonComponent/CommonCardHeader';
import { dossiersType } from '../../dossiers/dossiers';

interface OrganizationTabPropsType {
  data: dossiersType[] | undefined;
  // Other props if any
}

const OrganizationTab: React.FC<OrganizationTabPropsType> = ({ data }) => {
  const [orgActiveTab, setOrgActiveTab] = useState<number>();
  const callback = useCallback((tab:number) => {
    setOrgActiveTab(tab);
  }, []);

  return (
      <Card className="mb-0">
        <CommonCardHeader title={'Etat des Dossiers'} headClass='d-flex' /> 
        <CardBody className="p-0">
          <Row className="list-persons">
            <NavOrg callback={callback} data={data} />
            <Col xl="8" md="7" className='xl-50'>
              <TabContent activeTab={orgActiveTab}>
                <TabOrg data={data} />
              </TabContent>
            </Col>
          </Row>
        </CardBody>
      </Card>
  );
};

export default OrganizationTab;