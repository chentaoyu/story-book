import { coerceBooleanProperty, coerceCssPixelValue, coerceNumberProperty } from '@angular/cdk/coercion';
export function isEmpty(element: HTMLElement): boolean {
    const nodes = element.childNodes;
    for (let i = 0; i < nodes.length; i++) {
        if (filterNotEmptyNode(nodes.item(i))) {
            return false;
        }
    }
    return true;
}


export function filterNotEmptyNode(node: Node): Node {
    if (node) {
        if ((node.nodeType === 1) && ((node as HTMLElement).outerHTML.toString().trim().length !== 0)) {
            // ELEMENT_NODE
            return node;
        } else if ((node.nodeType === 3) && (node.textContent.toString().trim().length !== 0)) {
            // TEXT_NODE
            return node;
        }
        return null;
    }
    return null;
}

export function toBoolean(value: boolean | string): boolean {
    return coerceBooleanProperty(value);
}

