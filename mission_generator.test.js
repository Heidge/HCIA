const { Agency, Agent, Objective, Surveillance, Elimination, Exfiltration } = require("./mission_generator");


// Tests existants
test('Instantiate Agency class with correct attributes', () => {
    const agency = new Agency("Test Agency");
    expect(agency.name).toBe("Test Agency");
    expect(agency.agentList).toEqual([]);
});

test('Instantiate Agent class with correct attributes', () => {
    const agent = new Agent("Test Agent", "001");
    expect(agent.name).toBe("Test Agent");
    expect(agent.id).toBe("001");
    expect(agent.objectives).toEqual([]);
});

test('Instantiate Objective class with correct attributes', () => {
    const objective = new Objective("Test Objective");
    expect(objective.description).toBe("Test Objective");
});

test('Instantiate Surveillance class with correct attributes', () => {
    const surveillance = new Surveillance("Follow the target", "Test Target");
    expect(surveillance.description).toBe("Follow the target");
    expect(surveillance.target).toBe("Test Target");
});

test('Instantiate Elimination class with correct attributes', () => {
    const elimination = new Elimination("Neutralize the threat", "Test Target");
    expect(elimination.description).toBe("Neutralize the threat");
    expect(elimination.target).toBe("Test Target");
});

test('Instantiate Exfiltration class with correct attributes', () => {
    const exfiltration = new Exfiltration("Extract the agent", "Test Location");
    expect(exfiltration.description).toBe("Extract the agent");
    expect(exfiltration.location).toBe("Test Location");
});

test('Add an agent to the agency and check agent list', () => {
    const agency = new Agency("Test Agency");
    const agent = new Agent("Test Agent", "001");
    agency.addAgent(agent);
    expect(agency.agentList.length).toBe(1);
    expect(agency.agentList[0]).toBe(agent);
});

test('Assign an objective to an agent and check objectives list', () => {
    const agent = new Agent("Test Agent", "001");
    const objective = new Objective("Test Objective");
    agent.assignObjective(objective);
    expect(agent.objectives.length).toBe(1);
    expect(agent.objectives[0]).toBe(objective);
});

test('Check Surveillance is instance of Objective', () => {
    const surveillance = new Surveillance("Follow the target", "Test Target");
    expect(surveillance instanceof Objective).toBe(true);
});

test('Check Elimination is instance of Objective', () => {
    const elimination = new Elimination("Neutralize the threat", "Test Target");
    expect(elimination instanceof Objective).toBe(true);
});

test('Check Exfiltration is instance of Objective', () => {
    const exfiltration = new Exfiltration("Extract the agent", "Test Location");
    expect(exfiltration instanceof Objective).toBe(true);
});

// Nouveaux tests pour Agency
test('Agency constructor sets location and foundedDate', () => {
    const agency = new Agency("Test Agency", "Paris");
    expect(agency.location).toBe("Paris");
    expect(agency.foundedDate).toBeInstanceOf(Date);
});

test('Agency.findAgentById finds the correct agent', () => {
    const agency = new Agency("Test Agency");
    const agent1 = new Agent("Agent 1", "001");
    const agent2 = new Agent("Agent 2", "002");
    agency.addAgent(agent1);
    agency.addAgent(agent2);
    const foundAgent = agency.findAgentById("002");
    expect(foundAgent).toBe(agent2);
});

test('Agency.createEliteAgency static method creates agency with 3 agents', () => {
    const agency = Agency.createEliteAgency("Elite Force", "London");
    expect(agency.name).toBe("Elite Force");
    expect(agency.location).toBe("London");
    expect(agency.agentList.length).toBe(3);
    expect(agency.agentList[0].name).toBe("Alpha");
});

// Nouveaux tests pour Agent
test('Agent constructor sets status and joinDate', () => {
    const agent = new Agent("Test Agent", "001", "inactive");
    expect(agent.status).toBe("inactive");
    expect(agent.joinDate).toBeInstanceOf(Date);
    expect(agent.completedObjectives).toEqual([]);
});

test('Agent.updateStatus changes the status', () => {
    const agent = new Agent("Test Agent", "001");
    const newStatus = agent.updateStatus("compromised");
    expect(newStatus).toBe("compromised");
    expect(agent.status).toBe("compromised");
});

test('Agent.completeObjective moves objective to completedObjectives', () => {
    const agent = new Agent("Test Agent", "001");
    const objective = new Objective("Test Objective");
    agent.assignObjective(objective);
    const completedObj = agent.completeObjective(0);
    expect(completedObj).toBe(objective);
    expect(agent.objectives.length).toBe(0);
    expect(agent.completedObjectives.length).toBe(1);
    expect(objective.status).toBe("completed");
});

// Nouveaux tests pour Objective
test('Objective constructor sets priority, status, and createdDate', () => {
    const objective = new Objective("Test Objective", "high", "in-progress");
    expect(objective.priority).toBe("high");
    expect(objective.status).toBe("in-progress");
    expect(objective.createdDate).toBeInstanceOf(Date);
});

test('Objective.updateStatus changes the status', () => {
    const objective = new Objective("Test Objective");
    const newStatus = objective.updateStatus("completed");
    expect(newStatus).toBe("completed");
    expect(objective.status).toBe("completed");
});

test('Objective.createUrgentObjective static method creates high priority objective', () => {
    const urgent = Objective.createUrgentObjective("Urgent Mission");
    expect(urgent.description).toBe("Urgent Mission");
    expect(urgent.priority).toBe("high");
    expect(urgent.status).toBe("pending");
});

// Nouveaux tests pour les classes enfants
test('Surveillance constructor sets difficultyLevel', () => {
    const surveillance = new Surveillance("Follow target", "Test Target", "high");
    expect(surveillance.difficultyLevel).toBe("high");
});

test('Surveillance.estimateResources returns appropriate resources', () => {
    const surveillance = new Surveillance("Follow target", "Test Target", "high");
    const resources = surveillance.estimateResources();
    expect(resources.personnel).toBe(3);
    expect(resources.equipment).toContain("cameras");
    expect(resources.estimatedDuration).toBe("7 days");
});

test('Elimination constructor sets difficultyLevel', () => {
    const elimination = new Elimination("Neutralize threat", "Test Target", "medium");
    expect(elimination.difficultyLevel).toBe("medium");
});

test('Elimination.estimateResources returns appropriate resources', () => {
    const elimination = new Elimination("Neutralize threat", "Test Target", "medium");
    const resources = elimination.estimateResources();
    expect(resources.personnel).toBe(3);
    expect(resources.equipment).toContain("weapons");
});

test('Exfiltration constructor sets difficultyLevel', () => {
    const exfiltration = new Exfiltration("Extract agent", "Test Location", "low");
    expect(exfiltration.difficultyLevel).toBe("low");
});

test('Exfiltration.estimateResources returns appropriate resources', () => {
    const exfiltration = new Exfiltration("Extract agent", "Test Location", "low");
    const resources = exfiltration.estimateResources();
    expect(resources.personnel).toBe(2);
    expect(resources.equipment).toContain("transport vehicles");
    expect(resources.estimatedDuration).toBe("12 hours");
});
