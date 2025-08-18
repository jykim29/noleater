'use client';

import { TabButton, TabList } from '../common';

export default function ProfileFeedTab() {
  return (
    <TabList
      onSelect={() => {}}
      activeClassName="[&>button.active]:bg-secondary-gradient [&>button.active]:border-secondary-100"
    >
      <TabButton
        className="border-gray-60 bg-gray-gradient active h-10 w-full rounded-t-lg border"
        tabId="myFeed"
      >
        피드
      </TabButton>
      <TabButton
        className="border-gray-60 bg-gray-gradient h-10 w-full rounded-t-lg border"
        tabId="like"
      >
        좋아요
      </TabButton>
    </TabList>
  );
}
