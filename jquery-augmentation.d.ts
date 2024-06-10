import 'jquery'; // This import is necessary to extend the existing jQuery types

// Extend the JQuery interface with the new method
declare global {
  interface JQuery {
    telerik_ReportViewer(options: any): JQuery;
  }
}