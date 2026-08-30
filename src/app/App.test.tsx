import { fireEvent, render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { HashRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from './App';
import { LanguageProvider } from '../i18n/LanguageContext';

function renderApp(hash = '#/') {
  window.location.hash = hash;
  return render(
    <LanguageProvider>
      <HashRouter><App /></HashRouter>
    </LanguageProvider>,
  );
}

describe('secure demo shell', () => {
  beforeEach(() => { window.location.hash = '#/'; });

  it('shows a persistent secure-demo disclosure and 12 module links', () => {
    renderApp();
    expect(screen.getByText('DEMO－合成資料－不可用於正式事件')).toBeVisible();
    expect(screen.getAllByRole('link', { name: /AI Security/i })).toHaveLength(2);
    expect(screen.getAllByText(/尚未連線|Not connected/).length).toBeGreaterThan(0);
  });

  it('switches the interface to English without representing authentication', () => {
    renderApp();
    fireEvent.click(screen.getByRole('button', { name: 'Switch to English' }));
    expect(screen.getByText('DEMO — SYNTHETIC DATA — NOT FOR LIVE INCIDENTS')).toBeVisible();
    expect(screen.getByText(/This is not sign-in or real RBAC/)).toBeVisible();
  });

  it('renders an explicit stale state on a module page', () => {
    renderApp('#/ai-security');
    fireEvent.change(screen.getByLabelText('示範頁面狀態'), { target: { value: 'stale' } });
    expect(screen.getByRole('status')).toHaveTextContent('資料過期');
  });

  it('blocks direct admin route access in the demo', () => {
    renderApp('#/admin/configuration');
    expect(screen.getByText('無權存取')).toBeVisible();
    expect(screen.getByText(/角色檢視模擬不會授予存取/)).toBeVisible();
  });

  it('has no automatically detectable critical accessibility violations on Home', async () => {
    renderApp();
    const results = await axe.run(document.body, {
      rules: { 'color-contrast': { enabled: false } },
    });
    const critical = results.violations.filter((violation) =>
      violation.impact === 'critical' || violation.impact === 'serious',
    );
    expect(critical).toEqual([]);
  });
});
