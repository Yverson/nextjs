import React, { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";
import ProjectStatus from "./ProjectStatus";
import RecentProjects from "./RecentProjects";
import TotalProject from "./TotalProject";
import ProjectsOverview from "./ProjectsOverview";
import ClientActivity from "./ClientActivity";
import WebsiteDesign from "./WebsiteDesign";
import TodayTasks from "./TodayTasks";
import RunningEvents from "./RunningEvents";
import OnlineCourseTimeline from "./OnlineCourseTimeline";
import { accueilModel, fetchData } from "./accueilData";
import { storedUser } from "@/lib/various";

const ProjectContainer = () => {
  const [accueilData, setAccueilData] = useState<accueilModel>();
  var user = storedUser && JSON.parse(storedUser!.toString());
  useEffect(() => {
    const fetchAccueilData = async () => {
      const result = await fetchData();
      setAccueilData(result);
    };
    fetchAccueilData();
  }, []);

  return (
    <Container fluid className="dashboard-2">
      {accueilData && (
        <Row>
          <ProjectStatus accueildata={accueilData} />
          <RecentProjects accueildata={accueilData} />
          {/* <TotalProject /> */}
          {/* <ProjectsOverview /> */}
          {(user.TableauBordDepense || user.Admin) && <ClientActivity accueildata={accueilData} />}
          {(user.TableauBordDossier || user.Admin) && <WebsiteDesign accueildata={accueilData} />}
          {/* <TodayTasks /> */}
          {/* <RunningEvents /> */}
          {/* <OnlineCourseTimeline /> */}
        </Row>
      )}
    </Container>
  );
};

export default ProjectContainer;
