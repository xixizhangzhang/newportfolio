import { useState, type ReactNode } from "react";
import { Avatar, Button } from "@/design-system/ms-fluent-for-bic-65f6c6";
import {
  Navigation20Regular,
  Home20Regular,
  Search20Regular,
  Chat20Regular,
  Notebook20Regular,
  Add20Regular,
  Apps20Regular,
  Flash20Regular,
  MoreHorizontal20Regular,
  Sparkle20Filled,
} from "@fluentui/react-icons";
import {
  CopilotNavDrawer,
  CopilotNavDrawerHeader,
  CopilotNavDrawerBody,
  CopilotNavDrawerFooter,
  CopilotNavItem,
} from "@fluentui-copilot/react-copilot-nav";

interface CopilotShellProps {
  children: ReactNode;
}

const navItems = [
  { icon: <Home20Regular />, label: "Home", value: "home" },
  { icon: <Chat20Regular />, label: "Chat", value: "chat" },
  { icon: <Search20Regular />, label: "Search", value: "search" },
  { icon: <Notebook20Regular />, label: "Notebooks", value: "notebooks" },
  { icon: <Add20Regular />, label: "Create", value: "create" },
  { icon: <Flash20Regular />, label: "Actions", value: "actions" },
  { icon: <Apps20Regular />, label: "Apps", value: "apps" },
];

const CopilotShell = ({ children }: CopilotShellProps) => {
  const [isNavOpen, setIsNavOpen] = useState(true);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Collapsed nav strip */}
      {!isNavOpen && (
        <div
          style={{
            width: 48,
            minWidth: 48,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 8,
            borderRight: "1px solid hsl(var(--border))",
            background: "hsl(var(--background))",
          }}
        >
          <Button
            appearance="transparent"
            icon={<Navigation20Regular />}
            onClick={() => setIsNavOpen(true)}
            aria-label="Open navigation"
            size="small"
          />
          <div
            style={{
              marginTop: 12,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              alignItems: "center",
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.value}
                appearance="transparent"
                icon={item.icon}
                aria-label={item.label}
                size="small"
              />
            ))}
          </div>
          <div style={{ marginTop: "auto", paddingBottom: 12 }}>
            <Avatar name="User" size={28} />
          </div>
        </div>
      )}

      {/* Expanded nav drawer */}
      {isNavOpen && (
        <CopilotNavDrawer
          open={isNavOpen}
          type="inline"
          defaultSelectedValue="home"
        >
          <CopilotNavDrawerHeader>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                gap: 8,
              }}
            >
              <Button
                appearance="transparent"
                icon={<Navigation20Regular />}
                onClick={() => setIsNavOpen(false)}
                aria-label="Collapse navigation"
                size="small"
              />
              <Sparkle20Filled
                style={{ color: "hsl(var(--primary))" }}
              />
              <span style={{ fontWeight: 600, fontSize: 14 }}>
                Copilot
              </span>
            </div>
          </CopilotNavDrawerHeader>

          <CopilotNavDrawerBody>
            {navItems.map((item) => (
              <CopilotNavItem
                key={item.value}
                icon={item.icon}
                value={item.value}
              >
                {item.label}
              </CopilotNavItem>
            ))}
          </CopilotNavDrawerBody>

          <CopilotNavDrawerFooter>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "8px 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Avatar name="User" size={28} />
                <span style={{ fontSize: 13 }}>User</span>
              </div>
              <Button
                appearance="transparent"
                icon={<MoreHorizontal20Regular />}
                size="small"
              />
            </div>
          </CopilotNavDrawerFooter>
        </CopilotNavDrawer>
      )}

      {/* Main content */}
      <main style={{ flex: 1, overflow: "hidden" }}>{children}</main>
    </div>
  );
};

export default CopilotShell;
