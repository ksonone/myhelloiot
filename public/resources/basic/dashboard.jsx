{
  /* Basic units example. */
}
<DashboardGrid>
  <CCard title="Temperature pub/sub">
    <InputUnit
      pubtopic="myhelloiot/temperature"
      puboptions={{ retain: true }}
      subtopic="myhelloiot/temperature"
      format={NumberValueFormat({
        style: "unit",
        unit: "celsius",
      })}
    />
  </CCard>
  <CCard title="Select temperature">
    <ViewUnit
      subtopic="myhelloiot/temperature"
      format={NumberIconFormat({
        style: "unit",
        unit: "celsius",
      })}
    />
    <SliderUnit
      pubtopic="myhelloiot/temperature"
      puboptions={{ retain: true }}
      subtopic="myhelloiot/temperature"
      limits={{ min: -10, max: 60, step: 1 }}
    />
  </CCard>
  <CCard title="Temperature buttons">
    <ButtonUnit
      pubtopic="myhelloiot/temperature"
      puboptions={{ retain: true }}
      subtopic="myhelloiot/temperature"
      format={NumberIconValueFormat({
        style: "unit",
        unit: "celsius",
        min: -10,
        max: 60,
        step: -1,
      })}
    />
    <ButtonUnit
      pubtopic="myhelloiot/temperature"
      puboptions={{ retain: true }}
      subtopic="myhelloiot/temperature"
      format={NumberIconValueFormat({
        style: "unit",
        unit: "celsius",
        min: -10,
        max: 60,
        step: -1,
      })}
    />
  </CCard>
  <CCard title="Dashboard gauge card">
    <ViewUnit
      subtopic="myhelloiot/temperature"
      format={DashboardIconFormat(
        { title: "Dashboard gauge", min: -10, max: 60 },
        {
          style: "unit",
          unit: "celsius",
        }
      )}
    />
  </CCard>
</DashboardGrid>;
