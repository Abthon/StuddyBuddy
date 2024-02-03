import React from "react";

function RecentActivity({ dataCRUD }) {
  return (
    <section className="recent-activity">
      <div className="recent-activity__heading">
        <h2>Recent Activity</h2>
      </div>
      <div className="recent-activity__body">
        {dataCRUD.length > 0 ? (
          dataCRUD.map((activity, index) => (
            <div key={index} className="activity__item">
              <span>{activity.date}</span>
              <span>{activity.description}</span>
            </div>
          ))
        ) : (
          <p>No Recent activities</p>
        )}
      </div>
    </section>
  );
}

export default RecentActivity;
