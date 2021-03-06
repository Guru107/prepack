/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/* @flow */

import { Realm } from "../realm.js";
import { ObjectValue, Value } from "../values/index.js";
import invariant from "../invariant.js";
import { ReactEquivalenceSet } from "./ReactEquivalenceSet.js";

export class ReactElementSet {
  constructor(realm: Realm, reactEquivalenceSet: ReactEquivalenceSet) {
    this.realm = realm;
    this.reactEquivalenceSet = reactEquivalenceSet;
  }
  realm: Realm;
  reactEquivalenceSet: ReactEquivalenceSet;

  add(reactElement: ObjectValue, visitedValues: Set<Value> | void): ObjectValue {
    if (!visitedValues) visitedValues = new Set();
    let reactEquivalenceSet = this.reactEquivalenceSet;
    let currentMap = reactEquivalenceSet.reactElementRoot;

    // type
    currentMap = reactEquivalenceSet.getKey("type", currentMap, visitedValues);
    let type = reactEquivalenceSet.getEquivalentPropertyValue(reactElement, "type");
    let result = reactEquivalenceSet.getValue(type, currentMap, visitedValues);
    currentMap = result.map;
    // key
    currentMap = reactEquivalenceSet.getKey("key", currentMap, visitedValues);
    let key = reactEquivalenceSet.getEquivalentPropertyValue(reactElement, "key");
    result = reactEquivalenceSet.getValue(key, currentMap, visitedValues);
    currentMap = result.map;
    // ref
    currentMap = reactEquivalenceSet.getKey("ref", currentMap, visitedValues);
    let ref = reactEquivalenceSet.getEquivalentPropertyValue(reactElement, "ref");
    result = reactEquivalenceSet.getValue(ref, currentMap, visitedValues);
    currentMap = result.map;
    // props
    currentMap = reactEquivalenceSet.getKey("props", currentMap, visitedValues);
    let props = reactEquivalenceSet.getEquivalentPropertyValue(reactElement, "props");
    result = reactEquivalenceSet.getValue(props, currentMap, visitedValues);

    if (result.value === null) {
      result.value = reactElement;
    }
    invariant(result.value instanceof ObjectValue);
    return result.value;
  }
}
