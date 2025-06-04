/**
 * Interface that describes the structure of a financial product.
 * This matches exactly the "Estructura de Producto Financiero" from the PDF.
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}
