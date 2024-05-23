import React from "react";

export const TabType = {
    KEYWORD: "KEYWORD",
    HISTORY: "HISTORY",
  };
  
  const TabLabel = {
    [TabType.KEYWORD]: "추천 음식",
    [TabType.HISTORY]: "최근 음식",
  };

  const Tabs=({selectedTab,onChange})=>{
    return (
      <>
        <ul className="tabs">
          {Object.values(TabType).map((tabType) => (
            <li
              key={tabType}
              className={selectedTab === tabType ? "active" : ""}
              onClick={() => onChange( tabType )}
              //callback함수로 선택된 탭 타입을 전달.
            >
              {TabLabel[tabType]}
            </li>
          ))}
        </ul>
      </>
    );
  }

  export default Tabs;
